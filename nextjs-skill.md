# Next.js 开发规范

## 目录结构

- 公用工具统一放在 `lib/` 下。
- 按页面划分 `features/`，每个 feature 内按职责拆分 `component/`、`service/`、`action/`、`query/`、`hook/`、`error/`，只作用于当前 feature。
- 公用组件放在根目录 `components/` 下。

## 数据库

- 使用 Drizzle ORM，连接相关文件放在 `lib/db/`：
  - `index.ts`：数据库连接
  - `schema.ts`：表结构
  - `relation.ts`：表关系
- db 向 service 提供服务。

## 职责分层

- **service**：提供底层控制（如数据库访问），将底层异常包装成内部 Exception 向上抛出。
- **query**：直接调用 service，仅提供查询能力。查询使用 `use cache` 标记，并配对合适的 `cacheTag`。
- **action**：Server Action，提供增删改操作。操作后刷新对应的 cache 标签或页面；用 try/catch 捕获异常，包装成结构化数据返回，如 `{ error?: string }`。
- **component**：组件按可拆分粒度组织，如 `features/user/login/[index.ts, input.ts, tag.ts]`；数据获取优先在服务端组件（Server Component）中完成，配合 `Suspense` 展示加载态。

## 交互约束

- 调用 action 使用 `useActionState`、`useTransition` 或 `startTransition`，并正确展示 Pending 状态。
- 优先使用`server component`配合`Suspend` 来获取数据。
