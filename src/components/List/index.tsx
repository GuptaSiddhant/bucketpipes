import React from "react";
import { IconDotsCircleHorizontal, IconLoader } from "tabler-icons";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

import { styled } from "../../theme";
import { Schema } from "../../bitbucket/types";
import { Response } from "../../bitbucket/request/types";
import { Button } from "../Misc/Button";

import { ListItem } from "./ListItem";
import { ScrollFAB } from "./ScrollFAB";

interface List {
  items: ListItem[];
  isLoading?: boolean;
  emptyListFallback?: React.ReactNode;
}

const StyledList = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const List = (props: List) => {
  const {
    items = [],
    isLoading,
    emptyListFallback = "No items found.",
  } = props;
  if (isLoading && items.length === 0) return <div>Loading...</div>;

  return (
    <StyledList>
      {items.length < 1 ? (
        <div>{emptyListFallback}</div>
      ) : (
        items.map((item) => <ListItem {...item} key={item.uid} />)
      )}
    </StyledList>
  );
};

export interface InfiniteList<P, T = P> {
  uuid: string;
  fetchFunction: Function;
  fetchParams: Object;
  fetchSort?: string;
  itemBuilder: (item: T, index: number) => ListItem;
}

export const InfiniteList = <Paginated extends Schema.Paginated, T = Paginated>(
  props: InfiniteList<Paginated, T>
) => {
  const {
    uuid,
    fetchFunction,
    fetchParams,
    fetchSort = "",
    itemBuilder,
  } = props;
  const pagelen = 100;

  const [total, setTotal] = React.useState(100);
  const [items, setItems] = React.useState<ListItem[]>([]);
  const [page, setPage] = React.useState(1);
  const canFetchMore = total > pagelen * page;
  const fetchMore = React.useCallback(() => setPage((prev) => prev + 1), []);

  const { isLoading, data, isFetching } = useQuery<Response<Paginated>>(
    [uuid, fetchParams, page],
    (_, options, page) => {
      return fetchFunction({
        ...options,
        page,
        pagelen,
        sort: fetchSort,
      });
    },
    { suspense: false }
  );

  React.useEffect(() => {
    if (data) {
      const { size, values } = data.data;
      setTotal(size || 0);
      setItems((prevItems) => {
        const resItems: ListItem[] = [...prevItems];
        const newItems: ListItem[] = (values || []).map(itemBuilder);
        newItems.forEach((item) => {
          const index = resItems.findIndex((i) => i.uid === item.uid);
          if (index >= 0) resItems[index] = item;
          else resItems.push(item);
        });
        console.log(resItems.length);
        return resItems;
      });
    }
  }, [data, itemBuilder]);

  const { ref, inView } = useInView();
  React.useEffect(() => {
    if (inView && !isFetching) fetchMore();
  }, [inView, fetchMore, isFetching]);

  return (
    <main>
      <List
        items={items}
        isLoading={isLoading}
        emptyListFallback="Pipelines are not available for this repository."
      />
      <ScrollFAB />
      {canFetchMore && (
        <Button
          ref={ref}
          title={isFetching ? "Loading..." : "Load more"}
          Icon={isFetching ? IconLoader : IconDotsCircleHorizontal}
          onClick={fetchMore}
          disabled={isFetching}
          contained
          style={{ width: "100%" }}
        />
      )}
    </main>
  );
};

export { List, StyledList, ListItem, ScrollFAB };
