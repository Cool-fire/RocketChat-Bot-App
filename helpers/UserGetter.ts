import { HttpStatusCode, IHttp, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { UserResult } from './UserResult';

export class UserGetter {

    public async getUser(logger: ILogger, http: IHttp, url: string, botname: string): Promise<Array<UserResult>> {
        const response = await http.get(url);
        if (response.statusCode !== HttpStatusCode.OK || !response.data) {
            logger.debug('Did not get a valid response', response);
            throw new Error('Unable to retrieve the gif.');
        } else if (!Array.isArray(response.data)) {
            logger.debug('The response data is not an Array:', response.data);
            throw new Error('Data is in a format we don\'t understand.');
        }

        return response.data.map((r) => new UserResult(r));
    }
}
