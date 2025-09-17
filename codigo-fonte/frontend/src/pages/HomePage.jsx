import { useEffect } from 'react';
import { AppLayout } from '../layouts';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui';

const HomePage = () => {
  const { user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-heading-1 text-gray-900 mb-4">
            Bem-vindo ao Companion
          </h1>
          <p className="text-body-large text-gray-600 mb-8">
            Sua jornada conosco começa aqui. Explore todos os recursos que temos
            a oferecer.
          </p>
        </div>

   
        {user && (
          <div className="card-elevated p-8 mb-8">
            <h2 className="text-heading-3 text-gray-900 mb-4">
              Olá, {user.name || user.email}! 👋
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-heading-5 text-gray-900 mb-2">
                  Informações do Perfil
                </h3>
                <div className="space-y-2 text-body-medium text-gray-600">
                  <p>
                    <strong>Nome:</strong> {user.name || 'Não informado'}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Membro desde:</strong>{' '}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-heading-5 text-gray-900 mb-2">
                  Status da Conta
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-body-medium text-gray-600">
                      Conta Ativa
                    </span>
                  </div>
                  {user.emailVerified ? (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-body-medium text-gray-600">
                        Email Verificado
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-body-medium text-gray-600">
                        Email Pendente de Verificação
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

   
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-base p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-heading-5 text-gray-900 mb-2">Documentação</h3>
            <p className="text-body-medium text-gray-600 mb-4">
              Aprenda como aproveitar ao máximo o Companion
            </p>
            <Button variant="outline" size="small">
              Ver Documentação
            </Button>
          </div>

          <div className="card-base p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-heading-5 text-gray-900 mb-2">Configurações</h3>
            <p className="text-body-medium text-gray-600 mb-4">
              Personalize sua conta e preferências
            </p>
            <Button variant="outline" size="small">
              Gerenciar Configurações
            </Button>
          </div>

          <div className="card-base p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-heading-5 text-gray-900 mb-2">Suporte</h3>
            <p className="text-body-medium text-gray-600 mb-4">
              Obtenha ajuda quando mais precisar
            </p>
            <Button variant="outline" size="small">
              Contatar Suporte
            </Button>
          </div>
        </div>

        <div className="card-base p-8">
          <h2 className="text-heading-4 text-gray-900 mb-6">
            Atividade Recente
          </h2>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-heading-5 text-gray-900 mb-2">
              Nenhuma atividade recente
            </h3>
            <p className="text-body-medium text-gray-600">
              Sua atividade recente aparecerá aqui assim que você começar a usar
              a plataforma
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
