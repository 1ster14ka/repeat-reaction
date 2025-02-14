import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Rates from './pages/Rates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrency } from './redux/opreations';
import { setCurrency } from './redux/slices';
// import { getUserInfo } from './service/opencagedataApi';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;
      dispatch(getCurrency(crd));
      // const data = await getUserInfo(crd);
      // const { iso_code } = data.results[0].annotations.currency;

      // console.log(iso_code);
    }

    function error(err) {
      dispatch(setCurrency('USD'));
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
  // return <Heading title="Just do it!" />;
};
