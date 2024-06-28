import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Label, TextInput, Alert } from 'flowbite-react';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services';

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().min(4, 'Too Short!').required('Required'),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        try {
            const response = await UserService.login(values);
            console.log('Login successful', response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.href = '/';
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
      url('https://images.unsplash.com/photo-1508963493744-76fce69379c0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `,
            }}
        >
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">ระบบจัดการหลานเอง</h2>
                {error && (
                    <Alert color="failure" className="mb-4">
                        {error}
                    </Alert>
                )}
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="username" value="Your username" />
                                </div>
                                <Field name="username">
                                    {({ field }: { field: any }) => (
                                        <TextInput
                                            id="username"
                                            type="username"
                                            placeholder="Your username"
                                            required
                                            icon={HiUser}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                {errors.username && touched.username ? (
                                    <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                                ) : null}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <Field name="password">
                                    {({ field }: { field: any }) => (
                                        <TextInput
                                            id="password"
                                            type="password"
                                            required
                                            icon={HiLockClosed}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                {errors.password && touched.password ? (
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                ) : null}
                            </div>
                            <Button color='success' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default LoginPage;