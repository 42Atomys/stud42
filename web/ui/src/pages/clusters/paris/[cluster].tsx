import React from 'react';
import { useSidebar } from '@components/Sidebar';
import { GetStaticProps, NextPage } from 'next';
import { ClusterSidebar } from '@containers/clusters/ClusterSidebar';
import {
  ClusterEmpty,
  ClusterMap,
  ClusterPillar,
  ClusterRow,
  ClusterWorkspace,
  extractNode,
} from '@components/ClusterMap';
import { useClusterViewQuery } from '@graphql.d';

type PageProps = {
  cluster: 'e1' | 'e2' | 'e3';
};

type Campus = {
  [key: string]: {
    [key: string]: (number | 'pillar' | null)[];
  };
};

// prettier-ignore
const clusters: Campus = {
  e1: {
    r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
    r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
    r7: [1, 2, 3, 4, 5, 6, null, null, 7, 8, 9, 10, 11, 12, 13, 14, 15, null, 16, 17, 18, 19, 20, 21, 22],
    r6: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
    r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
    r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
  },
  e2: {
    r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
    r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
    r7: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r6: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, null, 15, 16, 17, 18, 19, 20],
    r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, null, 17, 18, 19, 20, 21, 22],
    r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
    r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
  },
  e3: {
    r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
    r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
    r7: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r6: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, null, 15, 16, 17, 18, 19, 20],
    r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, null, 17, 18, 19, 20, 21, 22],
    r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
    r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
    r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
  },
}

export const IndexPage: NextPage<PageProps> = ({ cluster }) => {
  const { SidebarProvider, PageContainer, PageContent } = useSidebar();

  const clusterRows = clusters[cluster];
  const { data, loading, error } = useClusterViewQuery({
    variables: { campusName: 'Paris', identifierPrefix: cluster },
  });

  return (
    <SidebarProvider>
      <PageContainer>
        <ClusterSidebar campus="paris" cluster={cluster as string} />
        <PageContent className="p-2 flex-1">
          {loading && <div>Loading...</div>}
          {error && <div>Error!</div>}
          {data && (
            <ClusterMap>
              {Object.keys(clusterRows).map((row) => (
                <ClusterRow key={`cluster-row-${row}`} displayText={row}>
                  {clusterRows[row].map((workspace) => {
                    if (workspace === null) return <ClusterEmpty />;
                    if (workspace === 'pillar') return <ClusterPillar />;

                    const identifier = `${cluster}${row}p${workspace}`;
                    const loc = extractNode(
                      data.locationsByCluster,
                      identifier
                    );

                    return (
                      <ClusterWorkspace
                        key={`cluster-workspace-${row}-${workspace}`}
                        identifier={identifier}
                        displayText={workspace.toString()}
                        connected={loc != null}
                      />
                    );
                  })}
                </ClusterRow>
              ))}
            </ClusterMap>
          )}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { cluster: 'e1' } },
      { params: { cluster: 'e2' } },
      { params: { cluster: 'e3' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params = {} }) => {
  const { cluster } = params;

  if (!cluster || ['e1', 'e2', 'e3'].includes(cluster as string) === false) {
    return { notFound: true };
  }

  return {
    props: {
      cluster,
    },
  };
};

export default IndexPage;