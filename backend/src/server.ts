/* eslint-disable no-console */
import { serverHttp } from './app';

serverHttp.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`);
});
