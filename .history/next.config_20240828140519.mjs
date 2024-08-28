const nextConfig = {
    webpack: (config) => {
      config.externals = {
        knex: "commonjs knex",
                "crypto": require.resolve("crypto-browserify")

      };
  
      return config;
    },
  };
export default nextConfig;
