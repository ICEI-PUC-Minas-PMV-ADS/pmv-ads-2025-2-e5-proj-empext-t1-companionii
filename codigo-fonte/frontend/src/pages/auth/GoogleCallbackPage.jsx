import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../hooks/useToast';
import { authService } from '../../services/authService';
import { FullPageLoader } from '../../components/ui';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`Autenticação com Google falhou: ${error}`);
        }

        if (!code) {
          throw new Error('Nenhum código de autorização recebido do Google');
        }

        const response = await authService.verifyGoogleAuth(code, state);

        if (response.success && response.user && response.token) {
          useAuthStore.getState().user = response.user;
          useAuthStore.getState().token = response.token;
          useAuthStore.getState().refreshToken = response.refreshToken;
          useAuthStore.getState().isAuthenticated = true;

          toast.success(
            `Bem-vindo de volta, ${response.user.name || response.user.email}!`,
          );
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Resposta inválida do servidor de autenticação');
        }
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        toast.error(error.message || 'Autenticação falhou. Tente novamente.');
        navigate('/login', { replace: true });
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, login, toast]);

  return <FullPageLoader message="Completando login com Google..." />;
};

export default GoogleCallbackPage;
