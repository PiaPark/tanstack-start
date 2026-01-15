TanStack Start 앱에 오신 것을 환영합니다!

# 시작하기

애플리케이션을 실행하려면:

```bash
npm install
npm run dev
```

# 프로덕션 빌드

프로덕션용으로 빌드하려면:

```bash
npm run build
```

## 테스트

이 프로젝트는 [Vitest](https://vitest.dev/)를 사용합니다. 테스트 실행:

```bash
npm run test
```

## 스타일링

이 프로젝트는 [Tailwind CSS](https://tailwindcss.com/)를 사용합니다.

## 라우팅

이 프로젝트는 [TanStack Router](https://tanstack.com/router)를 사용합니다. 파일 기반 라우터로 설정되어 있어 `src/routes` 디렉토리에서 라우트를 관리합니다.

### 라우트 추가하기

`./src/routes` 디렉토리에 새 파일을 추가하면 됩니다. TanStack이 자동으로 라우트 파일 내용을 생성합니다.

### 링크 추가하기

SPA 네비게이션을 사용하려면 `@tanstack/react-router`에서 `Link` 컴포넌트를 import하세요.

```tsx
import { Link } from "@tanstack/react-router";
```

JSX에서 다음과 같이 사용합니다:

```tsx
<Link to="/about">About</Link>
```

`Link` 컴포넌트에 대한 자세한 정보는 [Link 문서](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent)를 참조하세요.

### 레이아웃 사용하기

파일 기반 라우팅에서 레이아웃은 `src/routes/__root.tsx`에 있습니다. 루트 라우트에 추가하는 모든 것이 모든 라우트에 나타납니다. `<Outlet />` 컴포넌트가 있는 곳에 라우트 내용이 렌더링됩니다.

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

레이아웃에 대한 자세한 정보는 [레이아웃 문서](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts)를 참조하세요.

## TanStack Start 기능

TanStack Start는 풀스택 React 프레임워크로 다음 기능을 제공합니다:

### Server Functions

서버에서만 실행되는 함수를 정의할 수 있습니다:

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({ method: 'GET' }).handler(async () => {
  return new Date().toISOString()
})
```

### API Routes

`api.*.ts` 파일로 API 엔드포인트를 만들 수 있습니다:

```tsx
// src/routes/api.hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/hello')({
  GET: async () => {
    return Response.json({ message: 'Hello!' })
  },
})
```

### SSR (Server-Side Rendering)

TanStack Start는 기본적으로 SSR을 지원합니다. 각 라우트에서 렌더링 모드를 선택할 수 있습니다:
- **Full SSR**: 서버에서 완전히 렌더링
- **Data Only**: 데이터만 서버에서 로드
- **SPA Mode**: 클라이언트 사이드 렌더링

## 데이터 가져오기

TanStack Router의 `loader` 기능을 사용할 수 있습니다:

```tsx
export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json();
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
}
```

자세한 정보는 [Loader 문서](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters)를 참조하세요.

## 상태 관리

TanStack Store를 사용한 상태 관리:

```bash
npm install @tanstack/store
```

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <button onClick={() => countStore.setState((n) => n + 1)}>
      증가 - {count}
    </button>
  );
}
```

자세한 정보는 [TanStack Store 문서](https://tanstack.com/store/latest)를 참조하세요.

# 데모 파일

`demo` 접두사가 붙은 파일들은 안전하게 삭제할 수 있습니다. 설치된 기능을 테스트해볼 수 있는 시작점으로 제공됩니다.

# 더 알아보기

- [TanStack Start 문서](https://tanstack.com/start/latest)
- [TanStack Router 문서](https://tanstack.com/router/latest)
- [TanStack 전체 문서](https://tanstack.com)
