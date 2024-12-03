import Grid from 'components/grid';

export default function Loading() {
  return (
    <>
      <div className="mb-4 h-6" />
      <Grid className="grid-cols-2 border-l border-gray-200 md:grid-cols-3 lg:grid-cols-4">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return (
              <Grid.Item
                key={index}
                className="animate-pulse border-b border-r border-t border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-square w-full rounded-md bg-neutral-100 dark:bg-neutral-800" />
                <div className="mx-auto mt-6 h-4 w-3/4 rounded-md bg-neutral-100 dark:bg-neutral-800" />
                <div className="mx-auto mt-4 h-4 w-1/2 rounded-md bg-neutral-100 dark:bg-neutral-800" />
              </Grid.Item>
            );
          })}
      </Grid>
    </>
  );
}
