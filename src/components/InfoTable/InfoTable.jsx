import React from 'react';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

export default function InfoTable() {
  return (
    <div class='InfoTable'>
      <div class='InfoTable-Header'>
        <div class='InfoTable-Name'>Name</div>
        <div class='InfoTable-Commit'>Last commit</div>
        <div class='InfoTable-Message'>Commit message</div>
        <div class='InfoTable-Commiter'>Commiter</div>
        <div class='InfoTable-Date'>Updated</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>api</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>d53dsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] move http to arc</div>
        <div class='InfoTable-Commiter Commiter'>noxoomo</div>
        <div class='InfoTable-Date'>4 s ago</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>ci</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>c53dsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] test for empty commit message</div>
        <div class='InfoTable-Commiter Commiter'>nikitxskv</div>
        <div class='InfoTable-Date'>1 min ago</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>contrib</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>s53dsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] change owner to g:arc</div>
        <div class='InfoTable-Commiter Commiter'>nalpp</div>
        <div class='InfoTable-Date'>16:25</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>http</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>h5jdsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] move http to arc</div>
        <div class='InfoTable-Commiter Commiter'>somov</div>
        <div class='InfoTable-Date'>Yesterday, 14:50</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>lib</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>f5jdsv</div>
        </div>
        <div class='InfoTable-Message'>ARCADIA-771: append /trunk/arcadia/</div>
        <div class='InfoTable-Commiter Commiter'>deshevoy</div>
        <div class='InfoTable-Date'>Jan 11, 12:01</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>local</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>k5jdsv</div>
        </div>
        <div class='InfoTable-Message'>ARCADIA:771: detect binary files</div>
        <div class='InfoTable-Commiter Commiter'>exprmntr</div>
        <div class='InfoTable-Date'>Jan 10, 12:01</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>packages</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>a5jdsv</div>
        </div>
        <div class='InfoTable-Message'>
          [vcs] VCS-803: packages for services
        </div>
        <div class='InfoTable-Commiter Commiter'>levanov</div>
        <div class='InfoTable-Date'>Jan 1, 12:01</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>robots</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>l5jdsv</div>
        </div>
        <div class='InfoTable-Message'>
          ARCADIA-771: convert string to json object
        </div>
        <div class='InfoTable-Commiter Commiter'>torkve</div>
        <div class='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>server</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>j5jdsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] get list of refs</div>
        <div class='InfoTable-Commiter Commiter'>spreis</div>
        <div class='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div class='InfoTable-Text'>ut</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>5jdsvk</div>
        </div>
        <div class='InfoTable-Message'>[vsc] store merge conflicts</div>
        <div class='InfoTable-Commiter Commiter'>annaveronika</div>
        <div class='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_file'></div>
          <div class='InfoTable-Text'>README.md</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>h5jdsl</div>
        </div>
        <div class='InfoTable-Message'>[vcs] add readme</div>
        <div class='InfoTable-Commiter Commiter'>pg</div>
        <div class='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div class='InfoTable-Row'>
        <div class='InfoTable-Name'>
          <div class='InfoTable-EntryIcon InfoTable-EntryIcon_type_file'></div>
          <div class='InfoTable-Text'>ya.make</div>
        </div>
        <div class='InfoTable-Commit'>
          <div class='InfoTable-Text Link'>k5jdsv</div>
        </div>
        <div class='InfoTable-Message'>[vcs] move http to arc</div>
        <div class='InfoTable-Commiter Commiter'>mvel</div>
        <div class='InfoTable-Date'>Dec 29, 2017</div>
      </div>
    </div>
  );
}
