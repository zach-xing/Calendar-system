import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLayout from '../../layout';
import CalendarContent from './components/Content';
import { isLogined } from '../../utils/auth';

/**
 * 日历 page
 */
export default function Calendar() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLogined()) {
      navigate('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomLayout>
      <CalendarContent />
    </CustomLayout>
  );
}
