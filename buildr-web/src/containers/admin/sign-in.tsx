import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, useToast } from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';

// api
import { loginAsync } from '../../api';

// components
import AuthLayout from '../../components/layout/auth';

// storage
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';
import { USER_TOKEN } from '../../helpers/storage';

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { formState, handleSubmit, register } = useForm<buildr.User>({
    mode: 'onChange'
  });

  async function onSubmit(values: buildr.User) {
    try {
      // set the token first as the fetch call reads from storage
      localStorage.setItem(USER_TOKEN, btoa(`${values.username}:${values.password}`));
      const success = await loginAsync();

      if (success) {
        navigate('/admin');
        toast({
          status: 'success',
          title: SUCCESS_MESSAGE,
          description: 'Signed in'
        });
      } else {
        // remove the invalid token
        localStorage.removeItem(USER_TOKEN);
        toast({
          status: 'error',
          title: ERROR_MESSAGE,
          description: 'Invalid credentials'
        });
      }
    } catch (ex: any) {
      toast({
        status: 'error',
        title: ERROR_MESSAGE,
        description: ex.message
      });
    }
  }

  return (
    <AuthLayout title="Sign In">
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Input
          mb={4}
          type="text"
          placeholder="Username"
          {...register('username', {
            required: true
          })}
        />
        <Input
          mb={4}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: true
          })}
        />
        <Button
          disabled={!formState.isValid || formState.isSubmitting}
          type="submit"
          leftIcon={<MdLogin />}
          colorScheme="blue"
          isFullWidth
          isLoading={formState.isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
