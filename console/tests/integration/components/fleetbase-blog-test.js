import { module, test } from 'qunit';
import { setupRenderingTest } from '@fleetbase/console/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

module('Integration | Component | fleetbase-blog', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        this.owner.register(
            'service:fetch',
            class extends Service {
                requests = [];
                get(url) {
                    this.requests.push(url);
                    return Promise.resolve([]);
                }
            }
        );
    });

    test('it renders empty state and does not phone home', async function (assert) {
        await render(hbs`<FleetbaseBlog />`);

        const fetch = this.owner.lookup('service:fetch');
        assert.deepEqual(fetch.requests, [], 'FleetIndia blog widget must not call lookup/fleetbase-blog');
        assert.dom('.fleetbase-blog').containsText('No blog posts are available right now.');
    });
});
