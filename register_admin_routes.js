import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');

if (!content.includes('registerAdminOwnerRoutes')) {
  content = content.replace(
    "import { registerAccountRoutes } from './server/accountRoutes';",
    "import { registerAccountRoutes } from './server/accountRoutes';\nimport { registerAdminOwnerRoutes } from './server/adminOwnerRoutes';"
  );
  
  content = content.replace(
    "registerAccountRoutes(app);",
    "registerAccountRoutes(app);\n  registerAdminOwnerRoutes(app);"
  );
  
  fs.writeFileSync('server.ts', content, 'utf-8');
  console.log('Registered admin routes');
} else {
  console.log('Already registered');
}
