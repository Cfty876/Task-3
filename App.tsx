import { Switch, Route } from "wouter";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { GroupsPage } from "@/pages/GroupsPage";
import { GroupDetailPage } from "@/pages/GroupDetailPage";
import { CreateGroupPage } from "@/pages/CreateGroupPage";
import { AddStudentPage } from "@/pages/AddStudentPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GroupsPage} />
      <Route path="/group/:id" component={GroupDetailPage} />
      <Route path="/create-group" component={CreateGroupPage} />
      <Route path="/add-student" component={AddStudentPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
