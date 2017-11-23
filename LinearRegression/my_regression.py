import os
import tensorflow as tf

from LinearRegression.my_model import regr

m_desiderato = 4.0
q_desiderato = 3.0

with tf.variable_scope("my_model"):
    x = tf.placeholder(tf.float32)
    hypothesis, variables = regr(x)

y = tf.placeholder(tf.float32)

cost = tf.reduce_mean(tf.square(hypothesis - y))
optimizer = tf.train.GradientDescentOptimizer(0.1)
train = optimizer.minimize(cost)

saver = tf.train.Saver(variables)
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    for i in xrange(50):
        for step in range(-4, 4,
                          1):  # dandogli valori sia negativi che positivi che lo zero ce la caviamo con meno iterazioni
            x_1 = step * 1 / m_desiderato
            y_1 = step + q_desiderato
            if i % 2 == 0:
                x_1 = x_1 * 0.98
            if i % 3 == 0:
                y_1 = y_1 * 0.98
            sess.run(train, feed_dict={x: x_1, y: y_1})
            print step, x_1, y_1, sess.run(cost, feed_dict={x: x_1, y: y_1})

    print "value in 0", sess.run(hypothesis, feed_dict={x: 0})
    print "value in 100", sess.run(hypothesis, feed_dict={x: 100})

    path = saver.save(
        sess, os.path.join(os.path.dirname(__file__), 'data', 'linear_regression.ckpt'),
        write_meta_graph=False, write_state=False)
    print("Saved:", path)
