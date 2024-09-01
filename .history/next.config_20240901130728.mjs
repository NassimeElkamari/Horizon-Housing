const nextConfig = {
    webpack: (config) => {
      config.externals = {
        knex: "commonjs knex",
        
      };
  
      return config;
    },
  };
export default nextConfig;
