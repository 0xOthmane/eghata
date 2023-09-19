import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { ReactNode, useState } from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import api from '@/lib/api';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import { ListRowProps } from 'react-virtualized/dist/es/List';

interface SizeProps {
  width: number;
  height: number;
}
// interface IndexProps {
//   index: number;
// }

// interface PageProps {
//   startIndex: number;
//   stopIndex: number;
// }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Help = () => {
  const { t } = useTranslation();
  const rowHeight = 160;
  const loadData = () => [...Array(1000).keys()];
  const [list, setList] = useState(loadData());
  const [isLoading, setIsLoading] = useState(false)
  async function handleRefresh() {
    // await api.getHelpRequests();
    setIsLoading(true)
    await delay(500);
    list.push(list.length + 1);
    console.log(list.length);
    setIsLoading(false)
  }
  // const isRowLoaded = ({ index }: IndexProps) => {
  //   return !!list[index];
  // };

  // const loadMoreRows = ({ startIndex, stopIndex }: PageProps) => {
  //   // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`).then((response) => {
  //   //   // Store response data in list...
  //   // });
  // };

  function renderCard({ index, key, style }: ListRowProps) {
    return (
      <div key={index} style={style}>
        <Card className="my-4" />
      </div>
    );
  }
  const loadingElement: ReactNode = (isLoading &&
      <div className="flex items-center justify-center">
        <LoadingSpinner className='h-5 w-5' />
      </div>
    );
  
  return (
    <div className="flex flex-col justify-start w-full gap-4 pb-28 ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <ReactPullToRefresh onRefresh={handleRefresh} loading={loadingElement}>
          {/* <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={list.length}> */}
          <div className="flex-auto h-screen">
            <AutoSizer>
              {({ height, width }: SizeProps) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={rowHeight}
                  rowRenderer={renderCard}
                  rowCount={list.length}
                  overscanRowCount={5}
                />
              )}
            </AutoSizer>
            {/* </InfiniteLoader> */}
          </div>
        </ReactPullToRefresh>
      </div>
    </div>
  );
};

export default Help;
