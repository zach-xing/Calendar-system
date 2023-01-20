import React from 'react';
import { Calendar, Modal } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CHANGE_CUR_MONTH, event, REFRESH_DATA } from '../../../events';
import CalendarDateCell from './CalendarDateCell';
import { fetchEventList } from '../../../data/event';
import EditScheduleForm from '../../../components/EditScheduleForm';
import EditImportantDayForm from '../../../components/EditImportantDayForm';

export default function Content() {
  const [curDate, setCurDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );
  // 类似 {'2022-10-25': Array<Schedule | ImportantDay>}
  const [curMonthData, setCurMonthData] = React.useState<any>({});
  const [curOpenEventModal, setCurOpenEventModal] = React.useState<
    '' | 'schedule' | 'importantDay'
  >('');
  const [curEditEvent, setCurEditEvent] = React.useState<any>();

  // 监听左部分的卡片日历组件的改变
  React.useEffect(() => {
    event.on(CHANGE_CUR_MONTH, listenChangeMonth);
    return () => {
      event.off(CHANGE_CUR_MONTH, listenChangeMonth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchData();
    event.on(REFRESH_DATA, fetchData);
    return () => {
      event.off(REFRESH_DATA, fetchData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listenChangeMonth = (dateString: string) => {
    setCurDate(dateString);
  };

  // 获取数据
  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const list = await fetchEventList(curDate.slice(0, 7), user.id);
      const obj: any = {};
      list.forEach((item: any) => {
        const flag = item.dateString.slice(0, 10) as string;
        if (Object.hasOwn(obj, flag)) {
          obj[flag].push(item);
        } else {
          obj[flag] = [item];
        }
      });
      setCurMonthData(obj);
    } catch (error) {
      console.error('获取失败');
    }
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    setCurDate(value.format('YYYY-MM-DD'));
  };

  // 点击某个单元格
  const handleSelect = (newValue: Dayjs) => {
    setCurDate(newValue.format('YYYY-MM-DD'));
  };

  const renderItem = (date: Dayjs) => {
    if (Object.hasOwn(curMonthData, date.format('YYYY-MM-DD')))
      return (
        <CalendarDateCell
          list={curMonthData[date.format('YYYY-MM-DD')] as any}
          setCurOpenEditEventModal={setCurOpenEventModal}
          setCurEditEvent={setCurEditEvent}
        />
      );
  };

  return (
    <>
      <Calendar
        value={dayjs(curDate)}
        onPanelChange={onPanelChange}
        dateCellRender={renderItem}
        headerRender={({ value }) => (
          <div style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>
            {value.format('YYYY年MM月')}
          </div>
        )}
        onSelect={handleSelect}
      />

      <Modal
        title={curOpenEventModal === 'schedule' ? '编辑日程' : '编辑重要日'}
        open={curOpenEventModal.length !== 0}
        onCancel={() => setCurOpenEventModal('')}
        footer={null}
      >
        {curOpenEventModal === 'schedule' ? (
          <EditScheduleForm data={curEditEvent} />
        ) : (
          //  initialData={curEditEvent}
          <EditImportantDayForm data={curEditEvent} />
        )}
      </Modal>
    </>
  );
}
