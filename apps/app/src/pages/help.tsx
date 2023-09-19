import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { useState } from 'react';

interface SizeProps {
  width: number;
  height: number;
}
interface IndexProps {
  index: number;
}

interface PageProps {
  startIndex: number;
  stopIndex: number;
}

const Help = () => {
  const { t } = useTranslation();
  const rowHeight = 160;
  const loadData = () => [...Array(1000).keys()];
  const [list, setList] = useState(loadData());

  // const isRowLoaded = ({ index }: IndexProps) => {
  //   return !!list[index];
  // };

  // const loadMoreRows = ({ startIndex, stopIndex }: PageProps) => {
  //   // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`).then((response) => {
  //   //   // Store response data in list...
  //   // });
  // };

  function renderCard({ index, key, style }: any) {
    return (
      <div key={index} style={style}>
        <Card className="my-4" />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-start w-full gap-4 pb-28 ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>

      <div className="flex flex-col flex-auto h-screen gap-4 px-4">
        {/* <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={list.length}> */}
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
    </div>
  );
};

export default Help;
