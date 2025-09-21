import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { ForgotPasswordForm } from '../../components/forms';
import { useAuthStore } from '../../stores/authStore';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title="Gerenciamento Inteligente"
      subtitle="Gerencie projetos, organize tarefas diárias e gere relatórios automaticamente"
      formTitle="Redefinir sua senha"
      formSubTitle="Enviaremos um link para redefinir sua senha"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
