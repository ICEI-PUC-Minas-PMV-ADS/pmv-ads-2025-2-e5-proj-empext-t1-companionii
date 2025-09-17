import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { RegisterForm } from '../../components/forms';
import { useAuthStore } from '../../stores/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title="Gerenciamento Inteligente"
      subtitle="Gerencie projetos, organize tarefas diárias e gere relatórios automaticamente"
      formTitle="Crie sua conta"
      formSubTitle="Preencha os dados abaixo para criar sua nova conta"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
