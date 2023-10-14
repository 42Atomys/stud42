import { CampusIdentifier } from './types.generated';

/**
 * CampusLink is the same as CampusIdentifier but with a dash between words.
 * It is used for links in the interface. It is the same as CampusIdentifier
 * but in kebab-case instead of camelCase generated by the type.
 */
export type CampusLink = CampusIdentifier extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? '-' : ''}${Lowercase<T>}${CampusLink<U>}`
  : CampusIdentifier;

/**
 * Types of Cluster Map entities
 * P = PILLAR
 * W = WORKSPACE
 * T = TEXT
 */
export type ClusterMapEntity =
  | null
  | Pillar
  | Workspace
  | PersonalWorkspace
  | Text;

type Pillar = 'P';
type Workspace = `W:${string}`;
type PersonalWorkspace = 'PW' | `PW:${string}`;
type Text = `T:${string}`;

/**
 * Interface for a Cluster Map entry
 */
export interface ICluster {
  // Custom cluster name (e.g. "Metropolis").
  // If not set, the cluster name will be the cluster identifier.
  name(): string;
  // hasName() returns true if the cluster has a custom name.
  hasName(): boolean;
  // Cluster identifier (e.g. "c1", "e1").
  identifier(): string;
  // Total number of available workspaces in the cluster (e.g. 20).
  totalWorkspaces(): number;
  // map() returns a 2D array of ClusterMapEntity.
  // Each entry in the array represents a row in the cluster map.
  // Each entry in the row represents an `ClusterMapEntity` in the cluster map.
  map(): ClusterMapEntity[][];
}

/**
 * Interface for a Campus
 */
export interface ICampus {
  // Campus emoji (e.g. 🇫🇷)
  emoji(): string;
  // Campus name (e.g. "paris") used as display on UI.
  name(): string;
  // identifier is the name of the campus used in api communication, links, etc.
  // basically, it's the name of the campus without spaces and special
  // characters (e.g. "sao-paulo").
  identifier(): CampusIdentifier;
  // link is the name of the campus used in links in the interface. This is the
  // same as identifier but in kebab-case instead of camelCase.
  link(): CampusLink;
  // extrator function will extract the cluster, row and workspace from a given
  // identifier for this campus. It will return an object with the data present
  // in the identifier.
  //
  // The extrator can be simply defined with a regex (e.g. see Paris campus).
  //
  // e.g. for the identifier "c1r2p3" it will return :
  //   {
  //     building: "paul" | undefined,
  //     cluster: "1",
  //     row: "2",
  //     workspace: "3",
  //     clusterWithLetter: "c1",
  //     rowWithLetter: "r2",
  //     workspaceWithLetter: "p3",
  //   }
  extractor(identifier: string): {
    building?: string;

    cluster: string;
    row: string;
    workspace: string;

    clusterWithLetter: string;
    rowWithLetter: string;
    workspaceWithLetter: string;
  };

  // extractorRegexp contain a regexp to extract data from identifier used on
  // extractor function. See extractor function for more details.
  extractorRegexp(): RegExp;

  // List of clusters for this campus
  clusters(): ICluster[];

  // Find a cluster by its identifier (e.g. "c1").
  // Returns undefined if not found. Otherwise, returns the cluster.
  cluster(identifier: string): ICluster | undefined;
}
