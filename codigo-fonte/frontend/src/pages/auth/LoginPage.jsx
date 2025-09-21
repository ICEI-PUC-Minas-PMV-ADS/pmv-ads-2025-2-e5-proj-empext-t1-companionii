import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components/forms';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../hooks/useToast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state?.from?.pathname]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');
    const type = urlParams.get('type');

    if (message) {
      if (type === 'success') {
        toast.success(decodeURIComponent(message));
      } else if (type === 'error') {
        toast.error(decodeURIComponent(message));
      } else if (type === 'info') {
        toast.info(decodeURIComponent(message));
      }

      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location.search, toast]);

  return (
    <AuthLayout
      title="Gerenciamento Inteligente"
      subtitle="Gerencie projetos, organize tarefas diárias e gere relatórios automaticamente"
      formTitle="Acesse a sua conta"
      formSubTitle="Preencha os dados abaixo para acessar sua conta"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
