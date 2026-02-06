import { useTranslations } from 'next-intl';
import { eventList } from '../../../fakeData';
import { cardItem, CardList } from '../_component/CardList';

export default function Event() {
  const t = useTranslations('eventPage');
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between sm:items-start">
        <div className="w-full">
          <div id="titleContainer" className="w-full flex mx-2 my-5">
            <h1 className="text-2xl">{t('event')}</h1>
          </div>
          <div id="eventListContainer" className="w-full flex">
            <CardList type="event" list={eventList as Array<cardItem>} />
          </div>
        </div>
      </div>
    </div>
  );
}
