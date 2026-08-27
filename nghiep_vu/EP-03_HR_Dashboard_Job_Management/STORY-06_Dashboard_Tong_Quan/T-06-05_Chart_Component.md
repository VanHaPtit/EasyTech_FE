# T-06-05 · Vẽ biểu đồ cột với Recharts

> **Story:** [STORY-06](./STORY.md) · **Tag:** [FE] · **SP:** 2

## Dependencies
```bash
npm install recharts
```

## Implementation
```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count"
      fill="#0052cc"
      // Cột tháng hiện tại highlight màu khác
      shape={(props) => {
        const isCurrentMonth = props.month === currentMonth;
        return <rect {...props} fill={isCurrentMonth ? '#47b1de' : '#0052cc'} />;
      }}
    />
  </BarChart>
</ResponsiveContainer>
```
