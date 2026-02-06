import { CardContainer, CardContent, CardTitle } from '@/_components/Card';
import NextLink from '@/_components/Link';
import { Swiper } from '@/_components/Swiper';
import { eventList, groupDetailList, memberList } from '@/app/fakeData';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

// notice: segment name need to be "params", can't named param or other
export default async function GroupDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const t = await getTranslations('groupPage');
  const test = await params;
  const groupData = groupDetailList[test.id];
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between sm:items-start">
        <div className="w-full">
          <div id="titleContainer" className="w-full flex mx-2 my-5">
            <h1 className="text-2xl">{groupData.name}</h1>
          </div>
          <div id="memberContainer" className="w-full flex flex-wrap">
            <div id="visual" className="w-full h-[60vh] relative">
              <Image
                src={groupData.img}
                alt={groupData.name}
                layout="fill"
                objectFit="cover"
                className="w-full"
              />
            </div>
            <div
              id="intro"
              className="w-full flex flex-wrap h-auto my-4 mx-2 md:mx-0"
            >
              <p className="w-full">
                {t('startActiveDate')}：{groupData.activeDate}
              </p>

              <p className="w-full">{groupData.desc}</p>
            </div>
          </div>
          <div id="extractContent">
            <div id="eventContent" className="mt-4">
              <h1 className="text-lg ps-2 md:ps-0">{t('SponsoredEvents')}</h1>
              <div className="mt-2 h-60">
                <Swiper
                  containerClassName="h-full"
                  arrow={true}
                  listClassName="h-full"
                  itemClassName="w-(--home-swiper-item-space)"
                  items={eventList.map((event, key) => (
                    <CardContainer
                      className="h-full py-0 overflow-hidden mx-3"
                      key={key}
                    >
                      <NextLink className="h-full" href={'/event/' + event.id}>
                        <CardTitle className="h-[80%] relative">
                          <Image
                            src={event.img}
                            alt={event.name}
                            layout="fill"
                            objectFit="cover"
                            className="w-full select-none"
                            draggable={false}
                          />
                        </CardTitle>
                        <CardContent className="select-none">
                          {event.name}
                        </CardContent>
                      </NextLink>
                    </CardContainer>
                  ))}
                />
              </div>
            </div>
            <div id="memberContent" className="mt-4">
              <h1 className="text-lg ps-2 md:ps-0">{t('groupMember')}</h1>
              <div className="mt-2 h-60">
                <Swiper
                  containerClassName="h-full"
                  arrow={true}
                  listClassName="h-full"
                  itemClassName="w-(--home-swiper-item-space)"
                  items={memberList.map((member, key) => (
                    <CardContainer
                      className="h-full py-0 overflow-hidden mx-3"
                      key={key}
                    >
                      <NextLink
                        className="h-full"
                        href={'/member/' + member.id}
                      >
                        <CardTitle className="h-[80%] relative">
                          <Image
                            src={member.img}
                            alt={member.name}
                            layout="fill"
                            objectFit="cover"
                            className="w-full select-none"
                            draggable={false}
                          />
                        </CardTitle>
                        <CardContent className="select-none">
                          {member.name}
                        </CardContent>
                      </NextLink>
                    </CardContainer>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
