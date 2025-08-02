import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { UserIcon, TimeIcon, DocsIcon } from "../icons";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch posts and users concurrently
        const [postsResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUserId ? post.userId === selectedUserId : true;
    return matchesSearch && matchesUser;
  });

  const getUniqueUsers = () => {
    return users.filter((user) =>
      posts.some((post) => post.userId === user.id)
    );
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="Posts Dashboard | TailAdmin - React.js Admin Dashboard Template"
          description="Browse and explore posts from JSONPlaceholder API"
        />
        <PageBreadcrumb pageTitle="Posts" />

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-post-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Loading Posts...
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fetching data from JSONPlaceholder API
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageMeta
          title="Posts Dashboard | TailAdmin - React.js Admin Dashboard Template"
          description="Browse and explore posts from JSONPlaceholder API"
        />
        <PageBreadcrumb pageTitle="Posts" />

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-500/20 mx-auto mb-4">
                <DocsIcon className="h-6 w-6 text-error-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Failed to Load Posts
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-post-primary px-4 py-2 text-sm font-medium text-white hover:bg-post-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Posts Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="Browse and explore posts from JSONPlaceholder API with beautiful UI"
      />
      <PageBreadcrumb pageTitle="Posts" />

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {posts.length}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Posts
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-post-primary/10">
              <DocsIcon className="h-6 w-6 text-post-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {users.length}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Authors
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-post-accent/10">
              <UserIcon className="h-6 w-6 text-post-accent" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredPosts.length}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Filtered Results
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100 dark:bg-success-500/20">
              <DocsIcon className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header with Search and Filters */}
        <div className="border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Posts
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Explore posts from JSONPlaceholder API
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pl-10 text-sm focus:border-post-primary focus:outline-none focus:ring-2 focus:ring-post-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-64"
                />
                <DocsIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>

              {/* User Filter */}
              <select
                value={selectedUserId || ""}
                onChange={(e) =>
                  setSelectedUserId(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-post-primary focus:outline-none focus:ring-2 focus:ring-post-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Authors</option>
                {getUniqueUsers().map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-6">
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <DocsIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                No posts match your current search and filter criteria. Try
                adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const author = getUserById(post.userId);
                return (
                  <div
                    key={post.id}
                    className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-post-primary/30 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-post-primary/30"
                  >
                    {/* Post Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-post-primary/10">
                          <span className="text-sm font-medium text-post-primary">
                            {post.id}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {author?.name || "Unknown Author"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            @{author?.username || "unknown"}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-post-primary transition-colors">
                        {post.title}
                      </h4>
                    </div>

                    {/* Post Content */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4 mb-4">
                      {post.body}
                    </p>

                    {/* Post Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <TimeIcon className="h-3 w-3" />
                        <span>Post #{post.id}</span>
                      </div>

                      <button className="rounded-lg bg-post-primary/10 px-3 py-1.5 text-xs font-medium text-post-primary hover:bg-post-primary/20 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {filteredPosts.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-success-100 px-2.5 py-1 text-xs font-medium text-success-600 dark:bg-success-500/20 dark:text-success-400">
                  API Connected
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
