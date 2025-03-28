import { z } from 'zod';

// GitLab User
export const GitLabUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  avatar_url: z.string().optional(),
  web_url: z.string().optional()
});

export type GitLabUser = z.infer<typeof GitLabUserSchema>;

// GitLab Repository
export const GitLabRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  web_url: z.string(),
  default_branch: z.string(),
  visibility: z.enum(['private', 'internal', 'public']),
  ssh_url_to_repo: z.string(),
  http_url_to_repo: z.string(),
  readme_url: z.string().nullable().optional(),
  forks_count: z.number().optional(),
  star_count: z.number().optional(),
  created_at: z.string(),
  last_activity_at: z.string()
});

export type GitLabRepository = z.infer<typeof GitLabRepositorySchema>;

// GitLab Fork
export const GitLabForkSchema = GitLabRepositorySchema;
export type GitLabFork = z.infer<typeof GitLabForkSchema>;

// GitLab Reference (Branch/Tag)
export const GitLabReferenceSchema = z.object({
  name: z.string(),
  commit: z.object({
    id: z.string(),
    short_id: z.string(),
    title: z.string(),
    created_at: z.string(),
    parent_ids: z.array(z.string()).optional()
  }),
  merged: z.boolean().optional(),
  protected: z.boolean(),
  developers_can_push: z.boolean().optional(),
  developers_can_merge: z.boolean().optional(),
  can_push: z.boolean().optional(),
  default: z.boolean().optional(),
  web_url: z.string().optional()
});

export type GitLabReference = z.infer<typeof GitLabReferenceSchema>;

// GitLab Content
export const GitLabContentSchema = z.object({
  file_name: z.string(),
  file_path: z.string(),
  size: z.number(),
  encoding: z.string(),
  content: z.string(),
  content_sha256: z.string().optional(),
  ref: z.string(),
  blob_id: z.string(),
  commit_id: z.string(),
  last_commit_id: z.string().optional()
});

export type GitLabContent = z.infer<typeof GitLabContentSchema>;

// GitLab Create/Update File Response
export const GitLabCreateUpdateFileResponseSchema = z.object({
  file_path: z.string(),
  branch: z.string(),
  commit_id: z.string(),
  content: z.any().optional()
});

export type GitLabCreateUpdateFileResponse = z.infer<typeof GitLabCreateUpdateFileResponseSchema>;

// GitLab Search Response
export const GitLabSearchResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabRepositorySchema)
});

export type GitLabSearchResponse = z.infer<typeof GitLabSearchResponseSchema>;

// GitLab Group Projects Response
export const GitLabGroupProjectsResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabRepositorySchema)
});

export type GitLabGroupProjectsResponse = z.infer<typeof GitLabGroupProjectsResponseSchema>;

// GitLab Tree
export const GitLabTreeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['tree', 'blob']),
  path: z.string(),
  mode: z.string()
});

export type GitLabTree = z.infer<typeof GitLabTreeSchema>;

// GitLab Commit
export const GitLabCommitSchema = z.object({
  id: z.string(),
  short_id: z.string(),
  title: z.string(),
  author_name: z.string(),
  author_email: z.string(),
  authored_date: z.string(),
  committer_name: z.string(),
  committer_email: z.string(),
  committed_date: z.string(),
  created_at: z.string(),
  message: z.string(),
  parent_ids: z.array(z.string()).optional(),
  web_url: z.string(),
  stats: z.object({
    additions: z.number(),
    deletions: z.number(),
    total: z.number()
  }).optional()
});

export type GitLabCommit = z.infer<typeof GitLabCommitSchema>;

// GitLab Commits Response
export const GitLabCommitsResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabCommitSchema)
});

export type GitLabCommitsResponse = z.infer<typeof GitLabCommitsResponseSchema>;

// GitLab Issue
export const GitLabIssueSchema = z.object({
  id: z.number(),
  iid: z.number(),
  project_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  state: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().nullable(),
  closed_by: GitLabUserSchema.nullable().optional(),
  labels: z.array(z.union([z.string(), z.object({ name: z.string() })])),
  milestone: z.object({
    id: z.number(),
    iid: z.number(),
    project_id: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    state: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    due_date: z.string().nullable(),
    start_date: z.string().nullable(),
    web_url: z.string()
  }).nullable().optional(),
  assignees: z.array(GitLabUserSchema),
  author: GitLabUserSchema,
  user_notes_count: z.number().optional(),
  upvotes: z.number().optional(),
  downvotes: z.number().optional(),
  due_date: z.string().nullable().optional(),
  confidential: z.boolean().optional(),
  web_url: z.string()
});

export type GitLabIssue = z.infer<typeof GitLabIssueSchema>;

// GitLab Issues Response
export const GitLabIssuesResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabIssueSchema)
});

export type GitLabIssuesResponse = z.infer<typeof GitLabIssuesResponseSchema>;

// GitLab Merge Request
export const GitLabMergeRequestSchema = z.object({
  id: z.number(),
  iid: z.number(),
  project_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  state: z.string(),
  merged: z.boolean().optional(),
  author: GitLabUserSchema,
  assignees: z.array(GitLabUserSchema),
  source_branch: z.string(),
  target_branch: z.string(),
  diff_refs: z.object({
    base_sha: z.string(),
    head_sha: z.string(),
    start_sha: z.string()
  }).nullable().optional(),
  web_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  merged_at: z.string().nullable().optional(),
  closed_at: z.string().nullable().optional(),
  merge_commit_sha: z.string().nullable().optional()
});

export type GitLabMergeRequest = z.infer<typeof GitLabMergeRequestSchema>;

// GitLab Merge Requests Response
export const GitLabMergeRequestsResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabMergeRequestSchema)
});

export type GitLabMergeRequestsResponse = z.infer<typeof GitLabMergeRequestsResponseSchema>;

// GitLab Event
export const GitLabEventSchema = z.object({
  id: z.number(),
  project_id: z.number().optional(),
  action_name: z.string(),
  target_id: z.number().nullable().optional(),
  target_type: z.string().nullable().optional(),
  target_title: z.string().nullable().optional(),
  author: GitLabUserSchema,
  created_at: z.string(),
  note: z.object({
    id: z.number(),
    body: z.string(),
    attachment: z.any().nullable(),
    author: GitLabUserSchema,
    created_at: z.string(),
    updated_at: z.string(),
    system: z.boolean(),
    noteable_id: z.number(),
    noteable_type: z.string(),
    resolvable: z.boolean().optional(),
    confidential: z.boolean().optional(),
    url: z.string().optional()
  }).nullable().optional(),
  push_data: z.object({
    commit_count: z.number().optional(),
    action: z.string().optional(),
    ref: z.string().optional(),
    ref_type: z.string().optional(),
    commit_from: z.string().nullable().optional(),
    commit_to: z.string().nullable().optional(),
    commit_title: z.string().nullable().optional()
  }).nullable().optional()
});

export type GitLabEvent = z.infer<typeof GitLabEventSchema>;

// GitLab Events Response
export const GitLabEventsResponseSchema = z.object({
  count: z.number(),
  items: z.array(GitLabEventSchema)
});

export type GitLabEventsResponse = z.infer<typeof GitLabEventsResponseSchema>;

// File Operation
export const FileOperationSchema = z.object({
  path: z.string(),
  content: z.string()
});

export type FileOperation = z.infer<typeof FileOperationSchema>;

// Tool Input Schemas
export const CreateRepositoryOptionsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  visibility: z.enum(['private', 'internal', 'public']).default('private'),
  initialize_with_readme: z.boolean().default(true)
});

export const CreateBranchOptionsSchema = z.object({
  name: z.string(),
  ref: z.string().optional()
});

export const CreateIssueOptionsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  assignee_ids: z.array(z.number()).optional(),
  milestone_id: z.number().optional(),
  labels: z.array(z.string()).optional()
});

export const CreateMergeRequestOptionsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  source_branch: z.string(),
  target_branch: z.string(),
  allow_collaboration: z.boolean().optional(),
  draft: z.boolean().optional()
});

// Tool Schemas
export const CreateOrUpdateFileSchema = z.object({
  project_id: z.string(),
  file_path: z.string(),
  content: z.string(),
  commit_message: z.string(),
  branch: z.string(),
  previous_path: z.string().optional()
});

export const SearchRepositoriesSchema = z.object({
  search: z.string(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const CreateRepositorySchema = CreateRepositoryOptionsSchema;

export const GetFileContentsSchema = z.object({
  project_id: z.string(),
  file_path: z.string(),
  ref: z.string()
});

export const PushFilesSchema = z.object({
  project_id: z.string(),
  files: z.array(FileOperationSchema),
  commit_message: z.string(),
  branch: z.string()
});

export const CreateIssueSchema = z.object({
  project_id: z.string()
}).merge(CreateIssueOptionsSchema);

export const CreateMergeRequestSchema = z.object({
  project_id: z.string()
}).merge(CreateMergeRequestOptionsSchema);

export const ForkRepositorySchema = z.object({
  project_id: z.string(),
  namespace: z.string().optional()
});

export const CreateBranchSchema = z.object({
  project_id: z.string(),
  branch: z.string(),
  ref: z.string().optional()
});

export const ListGroupProjectsSchema = z.object({
  group_id: z.string(),
  archived: z.boolean().optional(),
  visibility: z.enum(['public', 'internal', 'private']).optional(),
  order_by: z.enum(['id', 'name', 'path', 'created_at', 'updated_at', 'last_activity_at']).optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  simple: z.boolean().optional(),
  include_subgroups: z.boolean().optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const GetProjectEventsSchema = z.object({
  project_id: z.string(),
  action: z.string().optional(),
  target_type: z.string().optional(),
  before: z.string().optional(),
  after: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const ListCommitsSchema = z.object({
  project_id: z.string(),
  sha: z.string().optional(),
  since: z.string().optional(),
  until: z.string().optional(),
  path: z.string().optional(),
  all: z.boolean().optional(),
  with_stats: z.boolean().optional(),
  first_parent: z.boolean().optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const ListIssuesSchema = z.object({
  project_id: z.string(),
  iid: z.union([z.number(), z.string()]).optional(),
  state: z.enum(['opened', 'closed', 'all']).optional(),
  labels: z.string().optional(),
  milestone: z.string().optional(),
  scope: z.enum(['created_by_me', 'assigned_to_me', 'all']).optional(),
  author_id: z.number().optional(),
  assignee_id: z.number().optional(),
  search: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  updated_after: z.string().optional(),
  updated_before: z.string().optional(),
  order_by: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const ListMergeRequestsSchema = z.object({
  project_id: z.string(),
  state: z.enum(['opened', 'closed', 'locked', 'merged', 'all']).optional(),
  order_by: z.enum(['created_at', 'updated_at']).optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  milestone: z.string().optional(),
  labels: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  updated_after: z.string().optional(),
  updated_before: z.string().optional(),
  scope: z.enum(['created_by_me', 'assigned_to_me', 'all']).optional(),
  author_id: z.number().optional(),
  assignee_id: z.number().optional(),
  search: z.string().optional(),
  source_branch: z.string().optional(),
  target_branch: z.string().optional(),
  wip: z.enum(['yes', 'no']).optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});