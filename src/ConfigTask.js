
var fs = require('fs')
var sampleConfig = `
module.exports = {
  saveLocation: './dataFiles',
  unpackLocation: './unpackedFiles', // if not defined, defaults to 'unpackedFiles'
  apiUrl: 'https://api.inshosteddata.com/api',
  key: process.env.CD_API_KEY, // don't hardcode creds, keep them in environment variables ideally!
  secret: process.env.CD_API_SECRET,
  tables:[
    'user_dim',
    'assignment_dim',
    'course_dim',
    'course_section_dim',
    'enrollment_dim',
    'enrollment_term_dim',
    'pseudonym_dim',
    'submission_dim',
    'submission_fact', 
    'assignment_fact',
    'assignment_group_dim',
    'assignment_group_fact',
    'assignment_group_rule_dim',
    'assignment_group_score_dim',
    'assignment_group_score_fact',
    'communication_channel_dim',
    'communication_channel_fact',
    'conference_dim',
    'conference_fact',
    'conference_participant_dim',
    'conference_participant_fact',
    'conversation_dim',
    'conversation_message_dim',
    'conversation_message_participant_fact',
    'course_score_dim',
    'course_score_fact',
    'course_ui_canvas_navigation_dim',
    'course_ui_navigation_item_dim',
    'course_ui_navigation_item_fact',
    'discussion_entry_dim',
    'discussion_entry_fact',
    'discussion_topic_dim',
    'discussion_topic_fact',
    'enrollment_fact',
    'enrollment_rollup_dim',
    'external_tool_activation_dim',
    'external_tool_activation_fact',
    'file_dim',
    'file_fact',
    'group_dim',
    'group_fact',
    'group_membership_dim',
    'group_membership_fact'
  ],
  maxConnections: 200, // The maximum number of files allowed to be downloading simultaneously
}
`
class ConfigTask {
  constructor(opts, config, logger) {
    this.logger = logger
  }
  run(cb) {
    this.logger.info(sampleConfig)
    this.logger.info('was written to config.js')
    fs.writeFile('config.js.sample', sampleConfig, cb)
  }
  static validate(config) {
    var fields = [
      'saveLocation',
      'apiUrl',
      'key',
      'secret'
    ]
    var missing = []
    for (var field of fields) {
      if (!config[field]) missing.push(field)
    }
    if (missing.length) return `missing ${missing.join(', ')} fields in config`
    return null
  }
}
module.exports = ConfigTask
