# trademarkit&#8482;

## What is it? What does it do?

trademarkit is an app where you can search for brand names, or "wordmarks", in order to find information about the name's past and current usage.
Search results show the user a description of the company or product that the trademarked name represents , along with information regarding the entitity that owns
trademark, the city and state where the owner is located, and the status of the trademark (whether it is dead or active).

I chose this idea because I enjoy the challenge or coming up with clever and creative names, and I thought it would be fun to see how idea names are already being used, if at all.

The search table used to display the results uses pagination. Users can change the number of rows displayed for each, and they can jump to the last page or back to the first page.

## API

The API I used to fetch the data for this app is https://markerapi.com/.

To the use this API, I had to register an API username and receive an API password, which I needed to include URL path I used to make requests to the endpoint.

When I tried to fetch the data from the client side, I was prevented by the CORS policy. To get around this, I added a server module called `/trademark`.
This way, any request to the trademarkit site appended with `/trademark` is routed to the endpoint in that file. The endpoint located there makes a request to
https://markerapi.com/api/v2/trademarks/trademark/search term/status/active or all/start/an integer/username/api username/password/api password and returns the results
as a JSON object.

## Language and Framework Choices

Since React the client side framework I'm most proficient in is React, I chose to use it for building this project.

### Razzle project starter

I also chose to ues the project starter named [Razzle](https://github.com/jaredpalmer/razzle) by [Jared Palmer](https://github.com/jaredpalmer) (a dev whose work I follow), which I've never used before.
The reason I chose Razzle is that it through its CLI, you can a bootstrap a server-rendered project that is otherwise unopinionated regarding framework and architecture. Since I've never built a server-rendered appbut have been curious about doing so, and since the guide lines for the challenge explained that the URBN team uses SSR, I decided use this starter in order to learn more about implementing SSR.

### Material-UI

[Material-UI](https://material-ui.com/) is a library of styled React components. The reason I chose to use it for this project is that even though I enjoy styling components through various techniques including JSS, CSS-Grid, CSS modules, Flexbox, and others, my timeframe for designing and styling was limited. 

Material-UI allows for fast development while providing nice aesthetics. One thing I'd like to work on next is adding custom styling to the components.

## Things I'd Like to Improve

### Material-UI & SSR Issues

When you run trademarkit&#8482; locally, you'll notice a moment of unstyled HTML. Upon resarching the issue, I think that this comes from the need for extra configuration in order for Material-UI to work well with SRR. This is an issue I'm excited to look more into and solve.

### Testing

I plan to add tests for my components using [Jest](https://jestjs.io/) but have excluded them in the interest of timeliness. In my current role, I'm used to testing my Redux logic using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

### Theming and Styling

I'm typically fairly meticulous about trying to write concise, responsive CSS and JSS and about constructing cohesively designed applications. One project for which I had a lot of fun doing this is called [Click-Chord](https://www.clickchord.com/), where I leaned heavily on CSS-Grid and customized Material-UI components heavily.

### Functionality

I'd like to add some smaller details such as a loading wheel that displays conditionally accoring to the data's loading state. 

Also, I'd like to make the app more interesting (and more true to its title) by linking users to a destination where they can take further action toward filing for a trademark if they become interested in doing so while searching.

## Conclusion

I had a lot of fun working on this project. The guidelines and suggestions in the instructions also pushed me toward learning about some topics that I plan to keep exploring.

Thank you for the opportunity!



