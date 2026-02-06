import Image from 'next/image';
import { KV, eventList, memberList } from '../fakeData';
import { CardContainer, CardContent, CardTitle } from '@/_components/Card';
import { Swiper } from '@/_components/Swiper';
import NextLink from '@/_components/Link';
import { getHomeInfo } from '@/_hooks/useHomeInfo';
import { getTranslations } from 'next-intl/server';
import { GetHomeResponse } from '@/_libs/types/base.type';
import { getImagePath } from '@/_libs/utils';

export default async function Home() {
  const t = await getTranslations('HomePage');
  const data = (await getHomeInfo()).getQueryData<GetHomeResponse>(['home']);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between sm:items-start">
        <div className="flex w-full h-[60vh] relative">
          <Image
            src={data ? getImagePath(data!['img']) : KV}
            alt="kv"
            layout="fill"
            objectFit="cover"
            className="w-full"
          />
        </div>
        <div className="mt-2 w-full h-auto" id="contentContainer">
          <div className="w-full  me-2 mt-10" id="eventContainer">
            <div id="eventTitle" className="my-4">
              <p className="text-4xl mx-2 text-center font-JP font-bold text-font-light dark:text-font-dark">
                {t('event')}
              </p>
            </div>
            <div className="row w-full h-120">
              <Swiper
                containerClassName="h-full"
                arrow={true}
                listClassName="h-full"
                itemClassName="w-(--home-swiper-item-space)"
                items={data!['event'].map((event, key) => (
                  <CardContainer
                    className="h-full py-0 overflow-hidden mx-3"
                    key={key}
                  >
                    <NextLink className="h-full" href={'/event/' + event.id}>
                      <CardTitle className="h-[80%] relative">
                        <Image
                          src={getImagePath(event.img)}
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
          <div className="w-full my-20" id="memberContainer">
            <div id="memberTitle" className="my-4">
              <p className="text-4xl mx-2 text-center font-JP font-bold text-font-light dark:text-font-dark">
                {t('member')}
              </p>
            </div>
            <div className="row w-full h-120">
              <Swiper
                containerClassName="h-full"
                arrow={true}
                listClassName="h-full"
                itemClassName="w-(--home-swiper-item-space)"
                items={data!['member'].map((member, key) => (
                  <CardContainer
                    className="h-full py-0 overflow-hidden mx-3"
                    key={key}
                  >
                    <NextLink className="h-full" href={'/member/' + member.id}>
                      <CardTitle className="h-[80%] relative">
                        <Image
                          src={getImagePath(member.img)}
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
  );
}
