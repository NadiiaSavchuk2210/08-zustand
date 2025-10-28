import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import { useId } from 'react';
import type { NewNoteData, NoteTag } from '../../types/note';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';


interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
};

const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo'
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title is too long')
        .required('Title is required'),
    content: Yup.string()
        .max(500, 'Content is too long'),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
        .required('Tag is required'),
})

interface NoteFormProps {
    onClose: () => void,
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNoteData) => createNote(newNote),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
            toast.success('Note created!');
            onClose();
        },
        onError() {
            toast.error('Failed to create note');
        },
    });

    const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
        mutate(values);
        actions.resetForm();
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ resetForm }) => (
                    <Form className={css.form}>
                        <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId}-title`}>Title</label>
                            <Field id={`${fieldId}-title`} type="text" name="title"
                                className={css.input} />
                            <ErrorMessage name="title" className={css.error} component="span" />
                        </fieldset>
                        <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId}-content`}>Content</label>
                            <Field
                                as="textarea"
                                id={`${fieldId}-content`}
                                name="content"
                                rows={8}
                                className={css.textarea}
                            />
                            <ErrorMessage name="content" className={css.error} component="span" />
                        </fieldset>
                        <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId}-tag`}>Tag</label>
                            <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                                <option value="Todo">Todo</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Shopping">Shopping</option>
                            </Field>
                            <ErrorMessage name="tag" className={css.error} component="span" />
                        </fieldset>
                        <div className={css.actions}>
                            <button type="button" className={css.cancelButton} onClick={() => {
                                resetForm();
                                onClose();
                            }}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={css.submitButton}
                                disabled={false}
                            >
                                {isPending ? 'Creating...' : 'Create note'}
                            </button>
                            {isPending && < Loader isCreating />}
                        </div>
                    </Form>
                )}
            </Formik >
        </>
    );
}