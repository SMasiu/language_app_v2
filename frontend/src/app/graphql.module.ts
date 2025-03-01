import { NgModule } from '@angular/core'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { environment } from 'src/environments/environment'

const uri = environment.gqlEndPoint
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      },
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      mutate: {
        fetchPolicy: 'no-cache'
      }
    }
  }
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
