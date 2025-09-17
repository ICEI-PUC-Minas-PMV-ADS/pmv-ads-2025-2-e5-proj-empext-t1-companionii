import { Logo, FeatureCard } from '../components/ui';
import CalendarIcon from '../assets/calendar.svg';
import PeopleIcon from '../assets/people.svg';
import GraphIcon from '../assets/graph.svg';

const AuthLayout = ({ children, title, subtitle, formTitle, formSubTitle }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        {title && (
          <h2 className="text-center text-heading-3 text-gray-900 mb-1">
            Companion
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-body-medium text-gray-600 mb-4">
            {subtitle}
          </p>
        )}

        <div className="flex justify-center items-center space-x-8 mb-8">
          <FeatureCard
            icon={CalendarIcon}
            title="Dashboard Diário"
            bgColor="bg-blue-100"
          />
          <FeatureCard
            icon={PeopleIcon}
            title="Gestão de Clientes"
            bgColor="bg-green-100"
          />
          <FeatureCard
            icon={GraphIcon}
            title="Relatórios IA"
            bgColor="bg-purple-100"
          />
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card-elevated py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="text-heading-5">{formTitle}</h1>
          <h1 className="text-body-small mb-4">{formSubTitle}</h1>

          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-body-small text-gray-500">
          &copy; 2025 Companion. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
