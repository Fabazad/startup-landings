import dynamic from 'next/dynamic';
import { cloneElement } from 'react';

import { useTheme } from '@mui/material/styles';

import { flattenArray } from 'src/utils/helper';

import type { OrgChartProps, OrgChartListProps, OrgChartSubListProps } from './types';

// ----------------------------------------------------------------------

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), {
  ssr: false,
});

const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), {
  ssr: false,
});

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function TreeList<T>({ data, depth, nodeItem }: OrgChartListProps<T>) {
  const childs = (data as any).children;

  const cloneNode = (props: T) => cloneElement(nodeItem(props));

  const totalChildren = childs ? flattenArray(childs)?.length : 0;

  const label = cloneNode({ ...data, depth, totalChildren } as T);

  return (
    <TreeNode label={label}>
      {childs && (
        /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        <TreeSubList data={childs} depth={depth} nodeItem={nodeItem} />
      )}
    </TreeNode>
  );
}

// ----------------------------------------------------------------------

function TreeSubList<T>({ data, depth, nodeItem }: OrgChartSubListProps<T>) {
  return (
    <>
      {data.map((list) => (
        <TreeList
          key={(list as any).name || (list as any).title || (list as any).id}
          data={list}
          depth={depth + 1}
          nodeItem={nodeItem}
        />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export function OrganizationalChart<T>({ data, nodeItem, ...other }: OrgChartProps<T>) {
  const theme = useTheme();

  const cloneNode = (props: T) => cloneElement(nodeItem(props));

  const label = cloneNode({ ...data } as T);

  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.vars.palette.divider}
      label={label}
      {...other}
    >
      {data.children.map((list) => (
        <TreeList
          key={(list as any).name || (list as any).title || (list as any).id}
          depth={1}
          data={list}
          nodeItem={nodeItem}
        />
      ))}
    </Tree>
  );
}
