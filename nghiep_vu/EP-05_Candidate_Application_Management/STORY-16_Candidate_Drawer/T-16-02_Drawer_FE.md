# T-16-02 · Kết nối CandidateDrawer.tsx với API
> **Story:** [STORY-16](./STORY.md) · **Tag:** `[FE]` · **SP:** 3

```tsx
const CandidateDrawer = ({ applicationId, isOpen, onClose }) => {
  const { data: app, isLoading } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => ApplicationService.getDetail(applicationId),
    enabled: !!applicationId && isOpen
  });
  
  if (isLoading) return <DrawerSkeleton />;
  
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader candidate={app.candidate} aiScore={app.aiAnalysis?.score} />
      <Tabs>
        <TabPanel label="Tổng quan"><OverviewTab app={app} /></TabPanel>
        <TabPanel label="Timeline"><TimelineTab history={app.roundHistory} /></TabPanel>
        <TabPanel label="AI Analysis"><AITab analysis={app.aiAnalysis} /></TabPanel>
        <TabPanel label="Email"><EmailHistoryTab emails={app.emailHistory} /></TabPanel>
      </Tabs>
      <DrawerFooter app={app} onEvaluate={handleEvaluate} />
    </Drawer>
  );
};
```
