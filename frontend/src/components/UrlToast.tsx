import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { toast } from 'sonner';
import { router } from '../main';

const UrlToast = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    // Liste de toutes les routes de ton router
    const routes = router.routes.flatMap((route) => route.children || [route]);
    console.log('routes', routes);

    const isValid = routes.some((route: any) =>
      matchPath({ path: route.path, end: true }, currentPath)
    );
    console.log('isValid', isValid);

    if (!isValid && !shouldRedirect) {
      console.log('URL non reconnue :', currentPath);

      toast('Page introuvable', {
        description: `La page "${currentPath}" n'existe pas. Redirection vers l'accueil.`,
        duration: 4000,
      });

      setShouldRedirect(true);
    }
  }, [location, shouldRedirect]);

  useEffect(() => {
    if (shouldRedirect) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
  }, [shouldRedirect, navigate]);

  return null;
};

export default UrlToast;
