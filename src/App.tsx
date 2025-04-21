import { useEffect, useState } from 'react';
     import { MapComponent } from './components/MapComponent';
     import { Preloader } from './components/Preloader';
     import { Logo } from './components/Logo';

     const App: React.FC = () => {
       const [isLoaded, setIsLoaded] = useState(false);

       useEffect(() => {
         const timer = setTimeout(() => {
           setIsLoaded(true);
         }, 1200);

         return () => clearTimeout(timer);
       }, []);

       return (
         <div className=" relative w-full h-screen">
           {!isLoaded && <Preloader />}
           <MapComponent />
           <Logo />
         </div>
       );
     };

     export default App;