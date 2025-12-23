import { Flex, Typography } from 'antd';
import { formatDate, transformKeyToLabel } from '../../utilities/string-utilities.ts';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

interface DataEntryProps {
  dataKey: string;
  value: string | ReactNode;
}
const DataEntry = ({ dataKey, value }: DataEntryProps) => {
  const isDate = (str: string) =>
    dayjs(str, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ']).isValid();

  return (
    <Flex vertical>
      <Typography.Text type={'secondary'}>{transformKeyToLabel(dataKey)}</Typography.Text>
      {typeof value === 'string' ? (
        <Typography.Text>{isDate(value) ? formatDate(value) : value}</Typography.Text>
      ) : (
        value
      )}
    </Flex>
  );
};

export default DataEntry;
