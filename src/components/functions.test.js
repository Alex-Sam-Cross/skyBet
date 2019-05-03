const functions = require('./functions.js');

test('Custom Alerts', () => {
    expect(functions.customAlerts('This exciting new features is coming soon')).not.toBeNull();
});