import React from 'react';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

export default function InfoTable() {
  return (
    <div className='InfoTable'>
      <div className='InfoTable-Header'>
        <div className='InfoTable-Name'>Name</div>
        <div className='InfoTable-Commit'>Last commit</div>
        <div className='InfoTable-Message'>Commit message</div>
        <div className='InfoTable-Commiter'>Commiter</div>
        <div className='InfoTable-Date'>Updated</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>api</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>d53dsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] move http to arc</div>
        <div className='InfoTable-Commiter Commiter'>noxoomo</div>
        <div className='InfoTable-Date'>4 s ago</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>ci</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>c53dsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] test for empty commit message</div>
        <div className='InfoTable-Commiter Commiter'>nikitxskv</div>
        <div className='InfoTable-Date'>1 min ago</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>contrib</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>s53dsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] change owner to g:arc</div>
        <div className='InfoTable-Commiter Commiter'>nalpp</div>
        <div className='InfoTable-Date'>16:25</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>http</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>h5jdsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] move http to arc</div>
        <div className='InfoTable-Commiter Commiter'>somov</div>
        <div className='InfoTable-Date'>Yesterday, 14:50</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>lib</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>f5jdsv</div>
        </div>
        <div className='InfoTable-Message'>ARCADIA-771: append /trunk/arcadia/</div>
        <div className='InfoTable-Commiter Commiter'>deshevoy</div>
        <div className='InfoTable-Date'>Jan 11, 12:01</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>local</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>k5jdsv</div>
        </div>
        <div className='InfoTable-Message'>ARCADIA:771: detect binary files</div>
        <div className='InfoTable-Commiter Commiter'>exprmntr</div>
        <div className='InfoTable-Date'>Jan 10, 12:01</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>packages</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>a5jdsv</div>
        </div>
        <div className='InfoTable-Message'>
          [vcs] VCS-803: packages for services
        </div>
        <div className='InfoTable-Commiter Commiter'>levanov</div>
        <div className='InfoTable-Date'>Jan 1, 12:01</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>robots</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>l5jdsv</div>
        </div>
        <div className='InfoTable-Message'>
          ARCADIA-771: convert string to json object
        </div>
        <div className='InfoTable-Commiter Commiter'>torkve</div>
        <div className='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>server</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>j5jdsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] get list of refs</div>
        <div className='InfoTable-Commiter Commiter'>spreis</div>
        <div className='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_folder'></div>
          <div className='InfoTable-Text'>ut</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>5jdsvk</div>
        </div>
        <div className='InfoTable-Message'>[vsc] store merge conflicts</div>
        <div className='InfoTable-Commiter Commiter'>annaveronika</div>
        <div className='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_file'></div>
          <div className='InfoTable-Text'>README.md</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>h5jdsl</div>
        </div>
        <div className='InfoTable-Message'>[vcs] add readme</div>
        <div className='InfoTable-Commiter Commiter'>pg</div>
        <div className='InfoTable-Date'>Dec 29, 2017</div>
      </div>
      <div className='InfoTable-Row'>
        <div className='InfoTable-Name'>
          <div className='InfoTable-EntryIcon InfoTable-EntryIcon_type_file'></div>
          <div className='InfoTable-Text'>ya.make</div>
        </div>
        <div className='InfoTable-Commit'>
          <div className='InfoTable-Text Link'>k5jdsv</div>
        </div>
        <div className='InfoTable-Message'>[vcs] move http to arc</div>
        <div className='InfoTable-Commiter Commiter'>mvel</div>
        <div className='InfoTable-Date'>Dec 29, 2017</div>
      </div>
    </div>
  );
}
