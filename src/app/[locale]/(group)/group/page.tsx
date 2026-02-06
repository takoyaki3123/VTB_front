import { useTranslations } from 'next-intl';
import { groupList } from '../../../fakeData';
import { cardItem, CardList } from '../_component/CardList';

export default function Group() {
  const t = useTranslations('groupPage');
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between sm:items-start">
        <div className="w-full">
          <div id="titleContainer" className="w-full flex mx-2 my-5">
            <h1 className="text-2xl">{t('group')}</h1>
          </div>
          <div id="groupListContainer" className="w-full flex">
            <CardList type="group" list={groupList as Array<cardItem>} />
          </div>
        </div>
      </div>
    </div>
  );
}
