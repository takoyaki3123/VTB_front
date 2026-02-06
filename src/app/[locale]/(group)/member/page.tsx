import { useTranslations } from 'next-intl';
import { memberList } from '../../../fakeData';
import { cardItem, CardList } from '../_component/CardList';

export default function Member() {
  const t = useTranslations('memberPage');
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between sm:items-start">
        <div className="w-full">
          <div id="titleContainer" className="w-full flex mx-2 my-5">
            <h1 className="text-2xl">{t('member')}</h1>
          </div>
          <div id="memberListContainer" className="w-full flex">
            <CardList type="member" list={memberList as Array<cardItem>} />
          </div>
        </div>
      </div>
    </div>
  );
}
