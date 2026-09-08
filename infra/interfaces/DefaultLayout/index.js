import { Header, PageLayout, Text } from '@primer/react';
import Head from 'next/head';
import styles from './index.module.css';

const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({
  children,
  metadata = {},
  contentWidth,
}) {
  const extraContentClassesName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>
          {metadata.title
            ? `${metadata.title} · Gilmario Junior`
            : 'Gilmario Junior'}
        </title>
        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>
      <Header>
        <Header.Item full>
          <Header.Link href="/">Gilmario Junior</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/register">Cadastro</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/status">Status</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/login">Login</Header.Link>
        </Header.Item>
      </Header>{' '}
      <PageLayout>
        <PageLayout.Content
          width={contentWidth}
          className={extraContentClassesName}
        >
          {children}
        </PageLayout.Content>
        <PageLayout.Footer divider="line">
          <Text size="small" color="text.secondary">
            © {new Date().getFullYear()} QAX Solutions. Todos os direitos
            reservados.
          </Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
