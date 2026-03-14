import type { NavSectionProps } from 'src/components/nav-section';

import { flattenArray } from 'src/utils/helper';

// ----------------------------------------------------------------------

export function handleLoop(array: any, subheader?: string) {
  return array?.map((list: any) => ({
    subheader,
    ...list,
    ...(list.children && { children: handleLoop(list.children, subheader) }),
  }));
}

// ----------------------------------------------------------------------

export function splitPath(array: any[], key: string) {
  let stack = array.map((item) => ({ path: [item.title], currItem: item }));

  while (stack.length) {
    const { path, currItem } = stack.pop() as {
      path: string[];
      currItem: any;
    };

    if (currItem.path === key) {
      return path;
    }

    if (currItem.children?.length) {
      stack = stack.concat(
        currItem.children.map((item: any) => ({
          path: path.concat(item.title),
          currItem: item,
        }))
      );
    }
  }
  return null;
}

// ----------------------------------------------------------------------

type ItemProps = {
  group: string;
  title: string;
  path: string;
};

export function getAllItems({ data }: { data: NavSectionProps['data'] }) {
  const reduceItems = data.map((list) => handleLoop(list.items, list.subheader)).flat();

  const items = flattenArray(reduceItems).map((option) => {
    const group = splitPath(reduceItems, option.path);

    return {
      group: group && group.length > 1 ? group[0] : option.subheader,
      title: option.title,
      path: option.path,
    };
  });

  return items;
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ItemProps[];
  query: string;
};

export function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (query) {
    return inputData.filter(
      (item) =>
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.path.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}

// ----------------------------------------------------------------------

type GroupsProps = {
  [key: string]: ItemProps[];
};

export function groupItems(array: ItemProps[]) {
  const group = array.reduce((groups: GroupsProps, item) => {
    const nextGroups = { ...groups };
    nextGroups[item.group] = nextGroups[item.group] || [];
    nextGroups[item.group].push(item);
    return nextGroups;
  }, {});

  return group;
}
