'use client';

export default function ErrorPage({ error, retry }: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold mb-2">加载课表失败</h2>
      <p className="text-zinc-600 mb-4">{error.message}</p>
      <button onClick={() => retry()} className="rounded bg-zinc-900 text-white px-4 py-2">重试</button>
    </main>
  );
}
