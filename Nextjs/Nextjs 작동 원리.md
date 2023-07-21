## Next.js의 렌더링 순서

- Next.js의 Server의 render.tsx

```js
// next.js/packages/next/server/render.tsx
export async function renderToHTML(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
  query: NextParsedUrlQuery,
  renderOpts: RenderOpts
): Promise<RenderResult | null> {
  // ...

  const renderDocument = async () => {
    // ...
    async function loadDocumentInitialProps(
      renderShell?: (
        _App: AppType,
        _Component: NextComponentType
      ) => Promise<ReactReadableStream>
    ) {
      // ...
      const renderPage: RenderPage = (
        options: ComponentsEnhancer = {}
      ): RenderPageResult | Promise<RenderPageResult> => {
        // ...
        const html = ReactDOMServer.renderToString(
          <Body>
            <AppContainerWithIsomorphicFiberStructure>
              {renderPageTree(EnhancedApp, EnhancedComponent, {
                ...props,
                router,
              })}
            </AppContainerWithIsomorphicFiberStructure>
          </Body>
        );
        return { html, head };
      };
    }
    // ...
    return {
      bodyResult,
      documentElement,
      head,
      headTags: [],
      styles,
    };
  };
}
```

- `renderPage`에서 `html`을 만듬
- HTML을 만들 때, `ReactDOMServer.renderToString`을 사용하여 ReactNode를 HTML문자열로 만듬
- 이렇게 생성된 HTML은 htmpProps가 되어 document로 반환됨

```js
// next.js/packages/next/server/render.tsx
// 위와 같은 컴포넌트
export async function renderToHTML(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
  query: NextParsedUrlQuery,
  renderOpts: RenderOpts
): Promise<RenderResult | null> {
  // ...

  const documentResult = await renderDocument();

  const htmlProps: HtmlProps = {
    __NEXT_DATA__: {
      // ...
    },
  };

  const document = (
    <AmpStateContext.Provider value={ampState}>
      <HtmlContext.Provider value={htmlProps}>
        {documentResult.documentElement(htmlProps)}
      </HtmlContext.Provider>
    </AmpStateContext.Provider>
  );

  const documentHTML = ReactDOMServer.renderToStaticMarkup(document);

  // ...
  // 운영환경 여부에 따라 prefix에 속성을 다르게 하고,
  // prefix와 suffix 정보를 가진 streams를 선언한다
  // 이때 '<!-- __NEXT_DATA__ -->'가 prefix에 입력된다

  if (generateStaticHTML) {
    // ...
    return new RenderResult(optimizedHtml);
  }

  return new RenderResult(
    chainStreams(streams).pipeThrough(
      createBufferedTransformStream(postOptimize)
    )
  );
}
```

- 아래는 Client 코드

### 참고

[Next.js의 렌더링 과정](https://www.howdy-mj.me/next/hydrate)
