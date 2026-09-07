# class-table 课程表

一个基于 Next.js 的每周课程表 Web 应用。课程数据存放在 `data/schedule.json`，页面在服务端加载并校验数据后渲染，按「当前周次」自动标识本周课程。

## 技术栈

- [Next.js](https://nextjs.org) 16（App Router，React Server Components）
- React 19 / TypeScript
- Tailwind CSS 4
- 包管理：[Bun](https://bun.sh)

## 快速开始

```bash
bun install
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

其他脚本：

| 命令           | 说明                       |
| -------------- | -------------------------- |
| `bun run build` | 生产构建                   |
| `bun run start` | 启动生产服务器（需先 build） |
| `bun run lint`  | ESLint 检查                |

## 功能

- **桌面端**：7 天 × 4 节课的完整表格（`lg` 及以上断点显示），每节课展示课程名、教师、教室、备注。
- **移动端**：按天切换的紧凑视图，默认选中今天。
- **当前周次**：根据 `weekStart` 计算本周为第几周，顶部徽章实时显示。
- **周次过滤**：带 `weeks` 字段的课程，若本周不在其周次范围内则整体变暗显示（如「第 2-9 周」开课）。

## 数据格式

编辑 `data/schedule.json` 即可更新课表，无需改代码。格式如下：

```jsonc
{
  "weekStart": "2026-08-31",      // 第一周周一（必须，YYYY-MM-DD）
  "periods": [                    // 恰好 4 节课：上午 2 节 + 下午 2 节
    { "id": "p1", "label": "第一节", "time": "08:00 - 09:35" },
    { "id": "p2", "label": "第二节", "time": "09:50 - 11:25" },
    { "id": "p3", "label": "第三节", "time": "14:00 - 15:35" },
    { "id": "p4", "label": "第四节", "time": "15:50 - 17:25" }
  ],
  "courses": [
    {
      "day": "mon",              // 必填：mon/tue/wed/thu/fri/sat/sun
      "period": "p1",            // 必填：须为 periods 中的 id
      "name": "算法设计与分析",   // 必填
      "teacher": "王淑琴",        // 选填
      "room": "劝B416",           // 选填
      "weeks": "2-9",            // 选填：周次范围，见下方规则；缺省表示每周都有
      "remark": "第2-9周"         // 选填
    }
  ]
}
```

### weeks 字段规则

- 支持单个数字（`"3"`）、区间（`"2-9"`）、多个段用逗号分隔（`"2-9,11-13"`）。
- 省略该字段或字段非法时，默认每周开课。
- 非法格式会在加载时报错。

### 校验规则（加载时强制）

- `weekStart` 必须为 `YYYY-MM-DD`。
- `periods` 必须恰好 4 条。
- `courses` 的 `day`/`period`/`name` 必填且合法，同一 `day + period` 位置不允许重复。

## 目录结构

```
src/
├── app/
│   ├── page.tsx          # 首页：加载课表并渲染
│   ├── layout.tsx        # 根布局与元数据
│   └── error.tsx         # 课表加载失败的错误页（可重试）
└── features/
    └── schedule/
        ├── types.ts      # Day/Period/Course/ScheduleData 类型
        ├── constants.ts  # 星期、上午/下午分段常量
        ├── week.ts       # 当前周次计算、weeks 解析与周内判断
        ├── queries.ts    # 读取并解析 data/schedule.json
        ├── service/      # schedule.json 结构校验
        ├── error/        # ScheduleError
        └── component/    # 桌面表格、移动端视图、单元格、周次徽章
```

`data/schedule.json` 是唯一的数据源，服务端启动时读取。
