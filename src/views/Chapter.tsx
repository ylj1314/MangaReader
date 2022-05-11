import React, { useEffect } from 'react';
import { action, useAppSelector, useAppDispatch } from '~/redux';
import { Center } from 'native-base';
import Loading from '~/components/Loading';
import Reader from '~/components/Reader';

const { loadChapter, viewChapter, viewPage } = action;

const Chapter = ({ route, navigation }: StackChapterProps) => {
  const { mangaId, chapterId, page } = route.params || {};
  const dispatch = useAppDispatch();
  const chapterDict = useAppSelector((state) => state.dict.chapter);
  const data = chapterDict[mangaId + '$$' + chapterId];

  useEffect(() => {
    dispatch(viewChapter({ mangaId, chapterId }));
    dispatch(loadChapter({ mangaId, chapterId }));
  }, [dispatch, mangaId, chapterId]);

  const handlePageChange = (currentPage: number) => {
    dispatch(viewPage({ mangaId, page: currentPage }));
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!data) {
    return (
      <Center w="full" h="full" bg="black">
        <Loading color="white" />
      </Center>
    );
  }

  return (
    <Reader
      initPage={page}
      data={data.images}
      onPageChange={handlePageChange}
      goBack={handleGoBack}
    />
  );
};

export default Chapter;